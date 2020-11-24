package com.resturant.menu.services;

import com.resturant.menu.models.Section;

import java.util.Optional;

public interface SectionService {
    Iterable<Section> getSections();
    Section saveSection(Section sec);
    Optional<Section> getSectionById(String id);
    Section updateSection(String id, Section sec);
    String deleteSection(String id);
}
