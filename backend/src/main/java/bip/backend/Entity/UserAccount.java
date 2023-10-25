package bip.backend.Entity;

import bip.backend.Repository.UserAccountRepository;
import bip.backend.Repository.UserProfileRepository;
import bip.backend.GetRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "user_account", indexes = {
        @Index(name = "user_account_username_key", columnList = "username", unique = true)
})

public class UserAccount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "username", nullable = false)
    private String username;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "active", nullable = false)
    private Boolean active = false;

    @Column(name = "cafe_role")
    private String cafeRole;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_profile")
    private UserProfile userProfile;

    // verify user account when logging in, after wards return the user account details
    public String verifyUserAccount(String username, String password) {
        UserAccountRepository userAccountRepository = GetRepository.UserAccount();

        if (!userAccountRepository.existsByUsernameAndPassword(username, password)) {
            throw new RuntimeException("Incorrect Username or Password");
        }
        UserAccount userAccount = userAccountRepository.findByUsernameAndPassword(username, password);
        UserProfile credential = userAccount.getUserProfile();

        ObjectMapper mapper = new ObjectMapper();
        JsonNode arrayNode = mapper.valueToTree(credential.getProfileType());

        return switch (credential.getProfileType()) {
            case "admin", "manager", "staff", "owner" -> arrayNode.toString();
            default -> throw new RuntimeException("Invalid profile type");
        };
    }

    // view user account
    public String viewUserAcc() {
        List<UserAccount> userAccountList = GetRepository.UserAccount().findAll();
        ObjectMapper mapper = new ObjectMapper();
        JsonNode arrayNode = mapper.valueToTree(userAccountList);
        return arrayNode.toString();
    }

    // create user account
    public void createUserAcct(String username, String name, String password, String email, String jobTitle) {
        UserProfileRepository userProfileRepository = GetRepository.UserProfile();
        UserAccountRepository userAccountRepository = GetRepository.UserAccount();


        if (userAccountRepository.existsByUsername(username)) {
            throw new RuntimeException("Username already exists");
        }
        if (username.isEmpty() || password.isEmpty() || name.isEmpty() || email.isEmpty()) {
            throw new RuntimeException("Please fill in all fields");
        }
        if (jobTitle.isEmpty()) {
            throw new RuntimeException("Please select a job title");
        }
        UserProfile userProfile = userProfileRepository.findByJobTitle(jobTitle);
        UserAccount userAccount = new UserAccount();

        userAccount.userProfile = userProfile;
        userAccount.setUsername(username);
        userAccount.setName(name);
        userAccount.setPassword(password);
        userAccount.setEmail(email);
        userAccount.setUserProfile(userProfile);
        userAccount.setCafeRole("un-assign");

        userAccountRepository.save(userAccount);
    }

    // update user account
    public static boolean updateUserAccount(String username, String newUsername, String name, String
            password, String email, UserProfile userProfile, UserAccountRepository userAccountRepository) {
        if (!userAccountRepository.existsByUsername(username)) {
            throw new RuntimeException("Username does not exist");
        }
        if (username == null || password == null) {
            throw new RuntimeException("Username and password cannot be null");
        }
        if (userProfile == null) {
            throw new RuntimeException("User profile cannot be null");
        }
        UserAccount userAccount = userAccountRepository.findByUsername(username);
        userAccount.setUsername(newUsername);
        userAccount.setName(name);
        userAccount.setPassword(password);
        userAccount.setEmail(email);
        userAccount.setUserProfile(userProfile);

        userAccountRepository.save(userAccount);
        return true;
    }

    // suspend user account
    public static boolean suspendUserAccount(String username, UserAccountRepository userAccountRepository) {
        if (!userAccountRepository.existsByUsername(username)) {
            throw new RuntimeException("Username does not exist");
        }
        UserAccount userAccount = userAccountRepository.findByUsername(username);
        userAccountRepository.save(userAccount);
        return true;
    }

}