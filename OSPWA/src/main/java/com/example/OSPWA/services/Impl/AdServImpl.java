package com.example.OSPWA.services.Impl;

import com.example.OSPWA.entities.Products;
import com.example.OSPWA.entities.Users;
import com.example.OSPWA.repositories.ProductRepository;
import com.example.OSPWA.repositories.UserRepository;
import com.example.OSPWA.services.AdminService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

public class AdServImpl implements AdminService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public void createUserAcc() {
        Users newUser = new Users();
        // Set user properties here
        userRepository.save(newUser);
    }

    @Override
    public void readUserAccList() {
        List<Users> users = userRepository.findAll();
        // Logic to handle or display user list
    }

    @Override
    public void deleteUserAcc() {
        Optional<Users> user = userRepository.findById(/* pass the user's ID here */);
        user.ifPresent(value -> userRepository.delete(value));
    }

    @Override
    public void updateUserAcc() {
        Optional<Users> user = userRepository.findById(/* pass the user's ID here */);
        if (user.isPresent()) {
            Users updateUser = user.get();
            // Update user properties here
            userRepository.save(updateUser);
        }
    }

    @Override
    public void createProd() {
        Products newProduct = new Products();
        // Set product properties here
        productRepository.save(newProduct);
    }

    @Override
    public void readProdList() {
        List<Products> products = productRepository.findAll();
        // Logic to handle or display product list
    }

    @Override
    public void updateProd() {
        Optional<Products> product = productRepository.findById();
        if (product.isPresent()) {
            Products updateProduct = product.get();
            // Update product properties here
            productRepository.save(updateProduct);
        }
    }

    @Override
    public void deleteProd() {
        Optional<Products> product = productRepository.findById();
        product.ifPresent(value -> productRepository.delete(value));

    }
}
