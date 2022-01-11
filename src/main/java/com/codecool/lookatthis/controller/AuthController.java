package com.codecool.lookatthis.controller;

import com.codecool.lookatthis.entity.Client;
import com.codecool.lookatthis.model.ClientCredentials;
import com.codecool.lookatthis.repository.ClientRepository;
import com.codecool.lookatthis.security.JwtTokenServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;

    private final JwtTokenServices jwtTokenServices;

    private final ClientRepository clients;

    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AuthController(AuthenticationManager authenticationManager, JwtTokenServices jwtTokenServices, ClientRepository clients) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenServices = jwtTokenServices;
        this.clients = clients;
        this.passwordEncoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @PostMapping("/signin")
    public ResponseEntity<Object> signin(@RequestBody ClientCredentials data) {
        try {
            String email = data.getEmail();
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, data.getPassword()));
            List<String> roles = authentication.getAuthorities()
                    .stream()
                    .map(GrantedAuthority::getAuthority)
                    .collect(Collectors.toList());

            String token = jwtTokenServices.createToken(email, roles);
            Client client = clients.findByEmail(email).get();

            Map<Object, Object> model = new HashMap<>();
            model.put("userId", client.getId());
//            model.put("username", client.getUsername());
//            model.put("roles", roles);
            model.put("token", token);
//            model.put("status", 200);
            return ResponseEntity.ok(model);
        } catch (AuthenticationException e) {
            throw new BadCredentialsException("Invalid email/password supplied");
        }
    }

    @PostMapping("/register")
    ResponseEntity<Object> registerClient(@RequestBody Client client) {
        client.setRoles(List.of("USER"));
        client.setPassword(passwordEncoder.encode(client.getPassword()));
        clients.save(client);
        return new ResponseEntity<>("Created", HttpStatus.CREATED);
    }

}
