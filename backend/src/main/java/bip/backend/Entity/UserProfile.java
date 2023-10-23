package bip.backend.Entity;

import bip.backend.Repository.UserProfileRepository;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "user_profile")
@JsonIgnoreProperties({"userAccounts"})
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

    @OneToMany(mappedBy = "userProfile")
    private Set<UserAccount> userAccounts = new LinkedHashSet<>();


    // Create user profile
    public static void createUserProfile(String profileType, String jobTitle, UserProfileRepository userProfileRepository) {
        if (userProfileRepository.existsByJobTitle(jobTitle)) {
            throw new RuntimeException("Profile already exists");
        }
        if (profileType.isEmpty()) {
            throw new RuntimeException("Profile type cannot be null");
        }
        if (jobTitle.isEmpty()) {
            throw new RuntimeException("Job title cannot be null");
        }


        UserProfile userProfile = new UserProfile();
        userProfile.setProfileType(profileType);
        userProfile.setJobTitle(jobTitle);
        userProfile.setActive(true);

        userProfileRepository.save(userProfile);
    }

    // Update user profile
    public static void updateUserProfile(String jobTitle, String newJobTitle, UserProfileRepository userProfileRepository) {
        if (userProfileRepository.existsByJobTitle(newJobTitle)) {
            throw new RuntimeException("User profile already exist");
        }
        if (newJobTitle.isEmpty()) {
            throw new RuntimeException("Job title cannot be null");
        }

        UserProfile userProfile = userProfileRepository.findByJobTitle(jobTitle);
        userProfile.setJobTitle(newJobTitle);
        userProfileRepository.save(userProfile);
    }

    // Suspend user profile
    public static void suspendUserProfile(String jobTitle, UserProfileRepository userProfileRepository) {
        UserProfile userProfile = userProfileRepository.findByJobTitle(jobTitle);

        userProfileRepository.delete(userProfile);
    }

    // View userProfile and have ViewUserProfileController return as json
    public static String viewUserProfile(UserProfileRepository userProfileRepository) {
        List<UserProfile> userProfileList = userProfileRepository.findAll();
        ObjectMapper mapper = new ObjectMapper();
        JsonNode arrayNode = mapper.valueToTree(userProfileList);
        return arrayNode.toString();
    }

    // Search user profile by job title and return as json
    public static String searchUserProfile(String jobTitle, UserProfileRepository userProfileRepository) {
        return userProfileRepository.findByJobTitle(jobTitle).toString();
    }
}