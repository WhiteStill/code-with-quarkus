package org.acme.login;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.net.URI;
import java.nio.file.Paths;
import java.util.Map;
import java.util.UUID;

import org.jboss.resteasy.reactive.RestForm;
import org.jboss.resteasy.reactive.multipart.FileUpload;

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
    @Path("/logout") // 기존에는로그아웃하면항상메인이동
    public Response logout(@QueryParam("next") String next) { // ← next 파라미터추가
        context.session().destroy();
        String redirect = (next != null && next.equals("login")) ? "/login" : "/";
        return Response
                .seeOther(URI.create(redirect)) // ← ?next=login 이면/login으로
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

    @GET
    @Path("/profile")
    @Produces(MediaType.TEXT_HTML)
    public Response profilePage() {
    // ①세션체크(로그인안한사용자차단)
        String loginUser = context.session().get("loginUser");
        if (loginUser == null) {
            return Response
                .seeOther(URI.create("/login"))
                .build();
        }
    // ②DB에서사용자정보조회
        User user = User.findByUsername(loginUser);
    // ③세션에사용자정보저장(HTML에서활용)
        context.session().put("userEmail", user.email);
        context.session().put("userPhone", user.phone);
        context.session().put("profileImage",
                user.profileImage != null ? user.profileImage : "default.png");
    // ④프로필페이지반환
    InputStream html = getClass()
            .getClassLoader()
            .getResourceAsStream(
                    "META-INF/resources/login/profile.html");
    return Response.ok(html).build();
    }

    @GET
    @Path("/profile/info")
    @Produces(MediaType.APPLICATION_JSON)
    public Response profileInfo() {
        // 세션체크
        String loginUser= context.session().get("loginUser");
        if (loginUser== null) {
            return Response.status(401).build();
        }
        // DB 조회
        User user= User.findByUsername(loginUser);

    // JSON 응답
    return Response.ok(
            Map.of(
                    "username", user.username,
                    "email", user.email != null ? user.email : "",
                    "phone", user.phone != null ? user.phone : "",
                    "profileImage", user.profileImage != null
                            ? user.profileImage
                            : ""
                )
        ).build();
    }

    @POST
    @Path("/profile/update")
    @Transactional
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public Response profileUpdate(
            @FormParam("email") String email,
            @FormParam("phone") String phone) {
        // ①세션체크
        String loginUser = context.session().get("loginUser");
        if (loginUser == null) {
            return Response
                    .seeOther(URI.create("/login"))
                    .build();
        }
        // ②이메일중복체크(본인제외)
        User found = User.findByEmail(email);
        if (found != null && !found.username.equals(loginUser)) {
            return Response
                    .seeOther(URI.create("/profile?error=duplicate_email"))
                    .build();
        }
        // ③DB 업데이트
        User user = User.findByUsername(loginUser);
        user.email = email;
        user.phone = phone;
        return Response
                .seeOther(URI.create("/profile?success=updated"))
                .build();
    }

    @POST
    @Path("/profile/password")
    @Transactional
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public Response profilePassword(
            @FormParam("currentPassword") String currentPassword,
            @FormParam("newPassword") String newPassword) {
        // ①세션체크
        String loginUser = context.session().get("loginUser");
        if (loginUser == null) {
            return Response
                    .seeOther(URI.create("/login"))
                    .build();
        }
        // ②현재비밀번호확인(해시값비교)
        User user = User.findByUsername(loginUser);
        if (!user.password.equals(currentPassword)) {
            return Response
                    .seeOther(URI.create("/profile?error=wrong_password"))
                    .build();
        }
        // ③새비밀번호로DB 업데이트
        user.password = newPassword;
        return Response
                .seeOther(URI.create("/profile?success=password_changed"))
                .build();
    }
}
