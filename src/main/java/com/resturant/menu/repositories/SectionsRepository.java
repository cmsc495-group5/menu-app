package com.resturant.menu.repositories;

import com.resturant.menu.models.Section;
import org.springframework.data.repository.CrudRepository;

public interface SectionsRepository extends CrudRepository<Section, String> {
    void delete(Section deleted);
}
