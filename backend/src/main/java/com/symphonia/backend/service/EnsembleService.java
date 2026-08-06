package com.symphonia.backend.service;

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
     * Renvoie l'intégralité des ensembles.
     *
     * @return La liste des ensembles.
     */
    public Iterable<Ensemble> findAll() {
        return ensembleRepository.findAll();
    }

    /**
     * Renvoie un ensemble sélectionné suivant son id.
     *
     * @param id Identifiant de l'ensemble.
     * @return L'ensemble concerné.
     */
    public Ensemble findById(Long id) {
        return ensembleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(
                        "Aucun ensemble trouvé avec l'id : " + id));
    }
}