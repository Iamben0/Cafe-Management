package bip.backend.Entity;

import bip.backend.Repository.UserAccountRepository;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.LinkedHashSet;
import java.util.Set;

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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_profile")
    private UserProfile userProfile;

    @OneToMany(mappedBy = "user")
    private Set<WorkSlot> workSlots = new LinkedHashSet<>();

    // verify user account when logging in, after wards return the user account details
    public static String verifyUserAccount(String username, String password, UserProfile profileType, UserAccountRepository userAccountRepository) {
        if (!userAccountRepository.existsByUsernameOrPassword(username, password)) {
            throw new RuntimeException("Incorrect username or password");
        }
        if (!userAccountRepository.existsByProfileType(profileType)) {
            throw new RuntimeException("Incorrect profile type");
        }
        UserAccount userAccount = userAccountRepository.findByUsernameAndPassword(username, password);
        if (userAccount.getUserProfile().getProfileType().equals(profileType.getProfileType())) {
            return userAccount.toString();
        } else {
            throw new RuntimeException("Profile type does not match");
        }
    }

    // create user account
    public static void createUserAccount(String username, String name, String password, String email, UserProfile userProfile, UserAccountRepository userAccountRepository) {
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
