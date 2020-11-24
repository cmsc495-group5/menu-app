package com.resturant.menu.repositories;

import com.resturant.menu.models.Option;
import org.springframework.data.repository.CrudRepository;

public interface OptionsRepository extends CrudRepository<Option, String> {
    void delete(Option deleted);
}
