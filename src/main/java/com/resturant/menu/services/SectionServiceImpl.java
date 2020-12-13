/*
 * file Name: SectionServiceImpl.java
 * date: 12/13/2020
 * author: Group 5
 * purpose: Implementation of the section service interface
 */

package com.resturant.menu.services;

import com.resturant.menu.models.Section;
import com.resturant.menu.repositories.SectionsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
public class SectionServiceImpl implements SectionService {

    private final SectionsRepository sectionsRepository;

    @Autowired
    public SectionServiceImpl(SectionsRepository sectionsRepository) {
        this.sectionsRepository = sectionsRepository;
    }

    public Iterable<Section> getSections() {
        return sectionsRepository.findAll();
    }

    public Section saveSection(Section section) {
        section.setUpdated(new Date().toString());
        sectionsRepository.save(section);
        return section;
    }

    public Optional<Section> getSectionById(String id) {
        return sectionsRepository.findById(id);
    }

    public Section updateSection(String id, Section section) {
        Optional<Section> optSec = sectionsRepository.findById(id);
        Section sectionToUpdate = optSec.get();

        if (section.getTitle() != null) {
            sectionToUpdate.setTitle(section.getTitle());
        }

        if (section.getDescription() != null) {
            sectionToUpdate.setDescription(section.getDescription());
        }

        if (section.getInternalDescription() != null) {
            sectionToUpdate.setInternalDescription(section.getInternalDescription());
        }

        if (section.getItems() != null) {
            sectionToUpdate.setItems(section.getItems());
        }

        sectionToUpdate.setUpdated(new Date().toString());
        sectionsRepository.save(sectionToUpdate);
        return sectionToUpdate;
    }

    public String deleteSection(String id) {
        Optional<Section> optSection = sectionsRepository.findById(id);
        Section section = optSection.get();
        sectionsRepository.delete(section);
        return "";
    }
}
