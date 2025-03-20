// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DecentralizedLoginSystem {

    // Struct to store user data
    struct User {
        string username;
        string passwordHash; // We will store the hash of the password for security reasons
        bool isRegistered;
    }

    // Mapping to store user data by address
    mapping(address => User) public users;

    // Event to emit when a user registers
    event UserRegistered(address userAddress, string username);

    // Event to emit when a user logs in
    event UserLoggedIn(address userAddress);

    // Function to register a new user
    function register(string memory _username, string memory _passwordHash) public {
        require(!users[msg.sender].isRegistered, "User already registered");

        // Register the user
        users[msg.sender] = User(_username, _passwordHash, true);

        emit UserRegistered(msg.sender, _username);
    }

    // Function to log in an existing user
    function login(string memory _passwordHash) public {
        require(users[msg.sender].isRegistered, "User not registered");
        require(keccak256(abi.encodePacked(users[msg.sender].passwordHash)) == keccak256(abi.encodePacked(_passwordHash)), "Incorrect password");

        emit UserLoggedIn(msg.sender);
    }

    // Function to check if a user is registered
    function isRegistered(address _user) public view returns (bool) {
        return users[_user].isRegistered;
    }

    // Function to get the username of a registered user
    function getUsername(address _user) public view returns (string memory) {
        require(users[_user].isRegistered, "User not registered");
        return users[_user].username;
    }
}
