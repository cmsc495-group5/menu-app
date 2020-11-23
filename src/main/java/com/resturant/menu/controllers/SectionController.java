package com.resturant.menu.controllers;

import com.resturant.menu.models.Section;
import com.resturant.menu.services.SectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Optional;

@RestController
public class SectionController {
    SectionService sectionService;

    @Autowired
    public SectionController(SectionService sectionService){
        this.sectionService = sectionService;
    }

    @RequestMapping(method= RequestMethod.GET, value="/sections")
    public Iterable<Section> section(){
        return sectionService.getSections();
    }

    @RequestMapping(method=RequestMethod.POST, value="/sections")
    public Section save(@RequestBody Section sec){
        sec.setUpdated(new Date().toString());
        sectionService.saveSection(sec);
        return sec;
    }

    @RequestMapping(method=RequestMethod.GET, value="/sections/{id}")
    public Optional<Section> show(@PathVariable String id) {
        return sectionService.getSectionById(id);
    }

    @RequestMapping(method=RequestMethod.PUT, value="/sections/{id}")
    public Section update(@PathVariable String id, @RequestBody Section sec) {
        return sectionService.updateSection(id, sec);
    }

    @RequestMapping(method=RequestMethod.DELETE, value="/sections/{id}")
    public String delete(@PathVariable String id) {
        sectionService.deleteSection(id);
        return "";
    }
}