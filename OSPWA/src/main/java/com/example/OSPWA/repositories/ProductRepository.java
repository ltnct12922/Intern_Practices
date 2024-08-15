package com.example.OSPWA.repositories;

import com.example.OSPWA.entities.Products;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProductRepository extends JpaRepository<Products, String> {
    Optional<Products> findById();
}
