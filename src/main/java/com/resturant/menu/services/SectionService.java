/*
 * file Name: SectionService.java
 * date: 12/13/2020
 * author: Group 5
 * purpose: Service interface Sections
 */

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
