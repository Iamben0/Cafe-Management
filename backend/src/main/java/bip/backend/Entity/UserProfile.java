package bip.backend.Entity;

import bip.backend.Repository.UserProfileRepository;
import bip.backend.GetRepository;
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
    private Boolean active = true;

    @OneToMany(mappedBy = "userProfile")
    private Set<UserAccount> userAccounts = new LinkedHashSet<>();


    // Create user profile
    public void createUserProfile(String profileType, String jobTitle) {
        UserProfileRepository userProfileRepository = GetRepository.UserProfile();
        if (userProfileRepository.existsByJobTitle(jobTitle)) {
            throw new RuntimeException("Profile already exists");
        }
        if (profileType.isEmpty() || jobTitle.isEmpty()) {
            throw new RuntimeException("Please fill in all fields");
        }

        UserProfile userProfile = new UserProfile();
        userProfile.setProfileType(profileType);
        userProfile.setJobTitle(jobTitle);

        userProfileRepository.save(userProfile);
    }

    // View userProfile and have ViewUserProfileController return as json
    public String viewUserProfile() {
        List<UserProfile> userProfileList = GetRepository.UserProfile().findAll();
        ObjectMapper mapper = new ObjectMapper();
        JsonNode arrayNode = mapper.valueToTree(userProfileList);
        return arrayNode.toString();
    }

    // Update user profile
    public void updateUserProfile(String jobTitle, String newJobTitle) {
        UserProfileRepository userProfileRepository = GetRepository.UserProfile();
        if (userProfileRepository.existsByJobTitle(newJobTitle)) {
            throw new RuntimeException("User profile already exist");
        }
        if (newJobTitle.isEmpty()) {
            throw new RuntimeException("Job title cannot be null");
        }

        UserProfile userProfile = userProfileRepository.findByJobTitle(jobTitle).get(0);
        userProfile.setJobTitle(newJobTitle);
        userProfileRepository.save(userProfile);
    }

    // Suspend user profile by setting active status to false
    public void suspendUserProfile(String jobTitle) {
        UserProfileRepository userProfileRepository = GetRepository.UserProfile();
        UserProfile userProfile = userProfileRepository.findByJobTitle(jobTitle).get(0);
        userProfile.setActive(false);
        userProfileRepository.save(userProfile);
    }

    // Search user profile by job title and return as json
    public String retrieveUserProfile(String jobTitle) {
        List<UserProfile> userProfileList;
        if (jobTitle.isBlank()) {
            userProfileList = GetRepository.UserProfile().findAll();
        } else {
            userProfileList = GetRepository.UserProfile().findByJobTitleContainsIgnoreCase(jobTitle);
        }

        ObjectMapper mapper = new ObjectMapper();
        JsonNode arrayNode = mapper.valueToTree(userProfileList);
        return arrayNode.toString();
    }

}