package com.symphonia.backend.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.symphonia.backend.model.Ensemble;
import com.symphonia.backend.repository.EnsembleRepository;

@Service
public class EnsembleService {

    private final EnsembleRepository ensembleRepository;

    public EnsembleService(EnsembleRepository ensembleRepository) {

        this.ensembleRepository = ensembleRepository;

    }

    /**
     * Renvoie l'intégralité des ensembles
     *
     * @return
     */
    public Iterable<Ensemble> findAll() {

        return ensembleRepository.findAll();
    }

    /**
     * Renvoie un ensemble sélectionné suivant son id
     * @return L'ensemble concerné
     */
    public Ensemble findById(Long id) {
        Optional<Ensemble> optionalEnsemble =  nsembleRepository.findById(id);


        return ?????;
    }
}
