package ltu.group06.work.resoucesmanager.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    //    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http
//                .csrf(csrf -> csrf.disable())
//                .authorizeHttpRequests(auth -> auth
//                        .requestMatchers("/app/user/**").permitAll()
//                        .requestMatchers("/app/login", "/app/register", "/api/public/**").permitAll()
//                        .requestMatchers("/app/admin/**").hasRole("ADMIN")
//                        .requestMatchers("/app/home").permitAll()
//                        .anyRequest().authenticated()
//                )
//                .httpBasic(httpBasic -> httpBasic.disable())
//                .formLogin(login -> login
//                        .loginPage("/app/login")
//                        .loginProcessingUrl("/app/login-process")
//                        .defaultSuccessUrl("/app/home", true)
//                        .failureUrl("/app/login?error=true")
//                        .permitAll()
//                )
//                .logout(logout -> logout
//                        .logoutUrl("/app/logout")
//                        .logoutSuccessUrl("/app/login")
//                        .invalidateHttpSession(true) // Vô hiệu hóa session
//                        .deleteCookies("JSESSIONID") // Xóa cookie phiên làm việc
//                );
//
//        return http.build();
//    }
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())  // Tắt CSRF
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().permitAll()  // Cho phép tất cả request
                )
                .httpBasic(httpBasic -> httpBasic.disable())
                .formLogin(form -> form.disable());  // Tắt login form

        return http.build();
    }


    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}