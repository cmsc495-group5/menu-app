/*
 * file Name: SectionsRepository.java
 * date: 12/13/2020
 * author: Group 5
 * purpose: Interface for Mongo db interactions for Sections
 */

package com.resturant.menu.repositories;

import com.resturant.menu.models.Section;
import org.springframework.data.repository.CrudRepository;

public interface SectionsRepository extends CrudRepository<Section, String> {
    void delete(Section deleted);
}
