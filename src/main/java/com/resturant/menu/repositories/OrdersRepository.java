/*
 * file Name: OrdersRepository.java
 * date: 12/13/2020
 * author: Group 5
 * purpose: Interface for Mongo db interactions for Orders
 */

package com.resturant.menu.repositories;

import com.resturant.menu.models.Order;
import org.springframework.data.repository.CrudRepository;

public interface OrdersRepository extends CrudRepository<Order, String> {
    void delete(Order deleted);

    Iterable<Order> findByStatusNot(String complete);
}
