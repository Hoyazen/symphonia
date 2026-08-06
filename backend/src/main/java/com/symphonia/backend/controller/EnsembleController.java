package com.symphonia.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.symphonia.backend.service.EnsembleService;

import com.symphonia.backend.model.Ensemble;

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

    // TODO faire un GET sur un ID --------- {id}
    // @GetMapping
    // indice voir pour la récupération de "Path variable "

}
