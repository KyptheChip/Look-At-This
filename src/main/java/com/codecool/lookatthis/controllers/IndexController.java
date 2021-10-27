package com.codecool.lookatthis.controllers;

import com.codecool.lookatthis.models.Location;
import com.codecool.lookatthis.services.LocationServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class IndexController {

    @Autowired
    private LocationServiceInterface locationService;

    @GetMapping("/")
    public String index(Model model) {
        var locations = (List<Location>) locationService.findAll();
        model.addAttribute("locations", locations);
        return "index";
    }

    @GetMapping("/add-location")
    public String addLocation() {
        return "location-form";
    }
}
