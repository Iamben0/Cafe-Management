package bip.backend.Entity;

import bip.backend.Repository.UserAccountRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

@Getter
@Setter
@Entity
@Table(name = "user_account")
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

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @Fetch(FetchMode.JOIN)
    @JoinColumn(name = "user_profile", nullable = false)
    private UserProfile userProfile;


    // verify user account when logging in, after wards return the user account details
    public static String verifyUserAccount(String username, String password, UserAccountRepository userAccountRepository) {
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
    public static String viewAccount(String username, UserAccountRepository userAccountRepository) {
//        if (!userAccountRepository.existsByUsername(username)) {
//            throw new RuntimeException("Username does not exist");
//        }
//        UserAccount userAccount = userAccountRepository.findByUsername(username);
//        ObjectMapper mapper = new ObjectMapper();
//        JsonNode arrayNode = mapper.valueToTree(userAccount);
//
//        return arrayNode.toString();
        return null;
    }

    // create user account
    public static void createUserAcct(String username, String name, String password, String email, UserProfile userProfile, UserAccountRepository userAccountRepository) {
        if (userAccountRepository.existsByUsername(username)) {
            throw new RuntimeException("Username already exists");
        }
        if (username == null || password == null) {
            throw new RuntimeException("Username and password cannot be null");
        }
        if (userProfile == null) {
            throw new RuntimeException("User profile cannot be null");
        }
        UserAccount userAccount = new UserAccount();
        userAccount.setUsername(username);
        userAccount.setName(name);
        userAccount.setPassword(password);
        userAccount.setEmail(email);
        userAccount.setUserProfile(userProfile);

        userAccountRepository.save(userAccount);
    }

    // update user account
    public static boolean updateUserAccount(String username, String newUsername, String name, String password, String email, UserProfile userProfile, UserAccountRepository userAccountRepository) {
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
