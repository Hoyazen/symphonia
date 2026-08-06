package com.symphonia.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.symphonia.backend.model.Ensemble;
import com.symphonia.backend.service.EnsembleService;

@RestController
@RequestMapping("/api/ensembles")
public class EnsembleController {

    private final EnsembleService ensembleService;

    public EnsembleController(EnsembleService ensembleService) {
        this.ensembleService = ensembleService;
    }

    @GetMapping
    public Iterable<Ensemble> getAllEnsembles() {
        return ensembleService.findAll();
    }

    @GetMapping("/{id}")
    public Ensemble getEnsembleById(@PathVariable Long id) {
        return ensembleService.findById(id);
    }
}