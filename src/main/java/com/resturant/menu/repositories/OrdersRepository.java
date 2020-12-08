package com.resturant.menu.repositories;

import com.resturant.menu.models.Order;
import org.springframework.data.repository.CrudRepository;

public interface OrdersRepository extends CrudRepository<Order, String> {
    void delete(Order deleted);
}
