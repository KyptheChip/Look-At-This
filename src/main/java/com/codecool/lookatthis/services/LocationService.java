package com.codecool.lookatthis.services;

import com.codecool.lookatthis.models.Location;
import com.codecool.lookatthis.repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LocationService implements LocationServiceInterface{

    @Autowired
    private LocationRepository locationRepository;


    @Override
    public List<Location> findAll() {
        return (List<Location>) locationRepository.findAll();
    }
}
