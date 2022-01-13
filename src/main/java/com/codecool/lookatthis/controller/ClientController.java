package com.codecool.lookatthis.controller;

import com.codecool.lookatthis.entity.Client;
import com.codecool.lookatthis.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.UnknownHostException;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/api/client")
public class ClientController {

    private final ClientRepository clients;


    @Autowired
    public ClientController(ClientRepository clients) {
        this.clients = clients;
    }

    @GetMapping("/get/{clientId}")
    public ResponseEntity<Client> getClient(@PathVariable Long clientId) {
        return new ResponseEntity<>(clients.getClientById(clientId), HttpStatus.OK);
    }

    @GetMapping("/check/username/{username}")
    public ResponseEntity<Object> isUserNameAlreadyRegistered(@PathVariable String username ) throws UnknownHostException {
        if (clients.existsClientsByUsername(username))
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);

        return new ResponseEntity<>("Accepted", HttpStatus.OK);
    }

    @GetMapping("/check/email/{email}")
    public ResponseEntity<Object> isEmailAlreadyRegistered(@PathVariable String email ) {
        if (clients.existsClientsByEmail(email))
            return new ResponseEntity<>("Already registered", HttpStatus.ALREADY_REPORTED);

        return new ResponseEntity<>("Accepted", HttpStatus.OK);
    }
}
