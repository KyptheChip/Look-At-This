package com.codecool.lookatthis.controllers;

import com.codecool.lookatthis.models.Location;
import com.codecool.lookatthis.repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Controller
public class IndexController {

//    private static List<Location> locationList = new ArrayList<>(Arrays.asList(
//            new Location(1L, "Bla", "Bla", "bla"),
//            new Location(2L, "Bli", "Bli", "bli"),
//            new Location(3L, "Blo", "Blo", "blo")
//    ));

    @Autowired
    private LocationRepository locationRepository;

    @GetMapping("/")
    public String index(Model model) {
        List<Location> locations = (List<Location>) locationRepository.findAll();
        model.addAttribute("locations", locations);
        return "index";
    }

//    @GetMapping("/")
//    public List<Location> getAllLocations() {
//        return locationList;
//    }

    @GetMapping("/add-location")
    public String addLocation() {
        return "location-form";
    }
}
