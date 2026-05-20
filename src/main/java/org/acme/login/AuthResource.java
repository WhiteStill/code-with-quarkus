package org.acme.login;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.net.URI;
import java.io.InputStream;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import io.vertx.ext.web.RoutingContext;

@Path("/") // 기본경로가최상위/
public class AuthResource{
    // GET /login → 로그인HTML 페이지반환
    // GET / → 세션유무에따라메인페이지분기
    @GET
    @Produces(MediaType.TEXT_HTML)
    public Response mainPage() {
        String loginUser = context.session().get("loginUser");
        System.out.println("=== [GET /] 세션ID : " + context.session().id());
        System.out.println("=== [GET /] loginUser: " + loginUser);
        String htmlPath = (loginUser != null)
                ? "META-INF/resources/login/main_after_login.html"
                : "META-INF/resources/main_index.html";
        InputStream html = getClass().getClassLoader().getResourceAsStream(htmlPath);
        return Response.ok(html).build();
    }
    @GET
    @Path("/login") // 경로명시
    @Produces(MediaType.TEXT_HTML) // 서버→클라
    public Response loginPage() {
        InputStream html = getClass()
            .getClassLoader()
            .getResourceAsStream("META-INF/resources/login/login.html");
        return Response.ok(html).build();
    }

    @Inject
    RoutingContext context; // Quarkus Vert.x 세션접근

    @POST // 아이디, 패스워드전송받음
    @Path("/login_check")
    @Transactional
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public Response loginCheck(
        @FormParam("username") String username,
        @FormParam("password") String password) {

        User user = User.findByUsername(username); // 아이디조회
        if (user == null || !user.password.equals(password)) { // 존재확인
            return Response
                .seeOther(URI.create("/login?error=1"))
                .build();
        }
    // 세션에로그인정보저장
    context.session().put("loginUser", username);

    return Response
        .seeOther(URI.create("/after_login"))
        .build();
    }

    @GET
    @Path("/after_login")
    @Produces(MediaType.TEXT_HTML)
    public Response afterLogin() {

    // 세션체크: 로그인안한사용자차단
    String loginUser= context.session().get("loginUser");

    // 세션내용로그출력
    System.out.println("=== 세션ID : " + context.session().id());
    System.out.println("=== loginUser: " + loginUser);

    if (loginUser== null) {
        // 세션없음→ 로그인페이지로강제이동
        return Response
            .seeOther(URI.create("/login"))
            .build();
    }
    // 세션있음→ 로그인후HTML 반환
        InputStream html = getClass()
            .getClassLoader()
            .getResourceAsStream("META-INF/resources/login/main_after_login.html");
        return Response.ok(html).build();
    }
    
    @GET
    @Path("/logout")
    public Response logout() {
        // 로그아웃전세션정보출력
        System.out.println("=== 로그아웃전세션ID : " + context.session().id());
        System.out.println("=== 로그아웃전loginUser: " + context.session().get("loginUser"));
        // 세션전체삭제
        context.session().destroy();
        // 로그아웃후세션정보출력
        System.out.println("=== 로그아웃후세션ID : " + context.session().id());
        System.out.println("=== 로그아웃후loginUser: " + context.session().get("loginUser"));
        return Response
                .seeOther(URI.create("/"))
                .build();
    }
    
    // AuthResource.java 아래새로추가
    @GET
    @Path("/register")
    @Produces(MediaType.TEXT_HTML)
    public Response registerPage() {
        InputStream html = getClass()
                .getClassLoader()
                .getResourceAsStream(
                        "META-INF/resources/login/register.html");
        return Response.ok(html).build();
    }
    @POST
    @Path("/register_check")
    @Transactional
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Produces(MediaType.TEXT_HTML)
    public Response registerCheck(
        @FormParam("username") String username,
        @FormParam("password") String password, // SHA-256 해시값
        @FormParam("email") String email,
        @FormParam("phone") String phone) {
        // ①아이디중복체크
        if (User.findByUsername(username) != null) {
            return Response
                .seeOther(URI.create("/register?error=duplicate_username"))
                .build();
        }
        // ②이메일중복체크
        if (User.findByEmail(email) != null) {
            return Response
                    .seeOther(URI.create("/register?error=duplicate_email"))
                    .build();
        }
        // ③DB 삽입
        User newUser = new User();
        newUser.username = username;
        newUser.password = password; // 해시값저장
        newUser.email = email;
        newUser.phone = phone;
        newUser.persist();
        // ④가입완료페이지로이동
        return Response
                .seeOther(URI.create("/register_success"))
                .build();
    }
    
    @GET
    @Path("/register_success")
    @Produces(MediaType.TEXT_HTML)
    public Response registerSuccess() {
        InputStream html = getClass()
                .getClassLoader()
                .getResourceAsStream(
                        "META-INF/resources/login/register_success.html");
        return Response.ok(html).build();
    }
}


