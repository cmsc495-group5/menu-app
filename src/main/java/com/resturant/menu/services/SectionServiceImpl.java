package com.resturant.menu.services;

import com.resturant.menu.models.Section;
import com.resturant.menu.repositories.SectionsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
public class SectionServiceImpl implements SectionService {

    private SectionsRepository sectionsRepository;

    @Autowired
    public SectionServiceImpl(SectionsRepository sectionsRepository){
        this.sectionsRepository = sectionsRepository;
    }

    public Iterable<Section> getSections(){
        return sectionsRepository.findAll();
    }

    public Section saveSection(Section sec){
        sec.setUpdated(new Date().toString());
        sectionsRepository.save(sec);
        return sec;
    }

    public Optional<Section> getSectionById(String id) {
        return sectionsRepository.findById(id);
    }

    public Section updateSection(String id, Section sec) {
        Optional<Section> optSec = sectionsRepository.findById(id);
        Section s = optSec.get();
        
        if(sec.getTitle() != null){
            s.setTitle(sec.getTitle());
        }
        
        if(sec.getDescription() != null){
            s.setDescription(sec.getDescription());
        }
        
        if(sec.getInternalDescription() != null){
            s.setInternalDescription(sec.getInternalDescription());
        }

        s.setUpdated(new Date().toString());
        sectionsRepository.save(s);
        return s;
    }

    public String deleteSection(String id) {
        Optional<Section> optSection = sectionsRepository.findById(id);
        Section sec = optSection.get();
        sectionsRepository.delete(sec);
        return "";
    }
}
