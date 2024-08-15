package com.example.OSPWA.services;

import org.springframework.stereotype.Service;

@Service
public interface AdminService {

    void createUserAcc();
    void readUserAccList();
    void deleteUserAcc();
    void updateUserAcc();

    void createProd(); //add
    void readProdList();
    void updateProd();
    void deleteProd();

}
