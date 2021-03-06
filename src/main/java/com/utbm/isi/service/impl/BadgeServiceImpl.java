package com.utbm.isi.service.impl;

import com.utbm.isi.service.BadgeService;
import com.utbm.isi.domain.Badge;
import com.utbm.isi.repository.BadgeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Badge}.
 */
@Service
@Transactional
public class BadgeServiceImpl implements BadgeService {

    private final Logger log = LoggerFactory.getLogger(BadgeServiceImpl.class);

    private final BadgeRepository badgeRepository;

    public BadgeServiceImpl(BadgeRepository badgeRepository) {
        this.badgeRepository = badgeRepository;
    }

    /**
     * Save a badge.
     *
     * @param badge the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Badge save(Badge badge) {
        log.debug("Request to save Badge : {}", badge);
        return badgeRepository.save(badge);
    }

    /**
     * Get all the badges.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<Badge> findAll() {
        log.debug("Request to get all Badges");
        return badgeRepository.findAll();
    }


    /**
     * Get one badge by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Badge> findOne(Long id) {
        log.debug("Request to get Badge : {}", id);
        return badgeRepository.findById(id);
    }

    /**
     * Delete the badge by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Badge : {}", id);
        badgeRepository.deleteById(id);
    }
}
