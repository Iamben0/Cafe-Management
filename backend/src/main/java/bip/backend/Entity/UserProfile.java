package bip.backend.Entity;

import bip.backend.Repository.UserProfileRepository;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.LinkedHashSet;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "user_profile")
public class UserProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "profile_type", nullable = false)
    private String profileType;

    @Column(name = "job_title", nullable = false)
    private String jobTitle;

    @Column(name = "active", nullable = false)
    private Boolean active;

    @OneToMany(mappedBy = "up")
    private Set<UserAccount> userAccounts = new LinkedHashSet<>();

    public static void createUserProfile(String profileType, String jobTitle, UserProfileRepository userProfileRepository) {
        if (userProfileRepository.existsByJobTitle(jobTitle)) {
            throw new RuntimeException("Job title already exists");
        }
        UserProfile userProfile = new UserProfile();
        userProfile.setProfileType(profileType);
        userProfile.setJobTitle(jobTitle);
        userProfile.setActive(true);

        userProfileRepository.save(userProfile);
    }

    public static void updateUserProfile(String oldJobTitle, String newJobTitle, UserProfileRepository userProfileRepository) {
        if (!userProfileRepository.existsByJobTitle(oldJobTitle)) {
            throw new RuntimeException("User profile does not exist");
        }
        if (userProfileRepository.existsByJobTitle(newJobTitle)) {
            throw new RuntimeException("User profile already exist");
        }

        UserProfile userProfile = userProfileRepository.findByJobTitle(oldJobTitle);
        userProfile.setJobTitle(newJobTitle);

        userProfileRepository.save(userProfile);
    }

    public static void suspendUserProfile(String jobTitle, UserProfileRepository userProfileRepository) {
        if (!userProfileRepository.existsByJobTitle(jobTitle)) {
            throw new RuntimeException("User profile does not exist");
        }

        UserProfile userProfile = userProfileRepository.findByJobTitle(jobTitle);
        userProfile.setActive(false);
    }

    // View all user profile and return as json
    public static String viewUserProfile(UserProfileRepository userProfileRepository) {
        return userProfileRepository.findAll().toString();
    }
}