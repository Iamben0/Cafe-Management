package bip.backend.Entity;

import bip.backend.Repository.UserProfileRepository;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.*;

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

    @OneToMany(mappedBy = "up")
    private Set<UserAccount> userAccounts = new LinkedHashSet<>();


    public static void createUserProfile(String profileType, String jobTitle, UserProfileRepository userProfileRepository) {
        if (userProfileRepository.existsByProfileType(jobTitle)) {
            throw new RuntimeException("Profile type already exist");
        }

        UserProfile userProfile = new UserProfile();
        userProfile.setProfileType(profileType);
        userProfile.setJobTitle(jobTitle);

        userProfileRepository.save(userProfile);
    }

    // CHECK AGAIN
    public static Optional<UserProfile> viewUserProfile(Integer id, UserProfileRepository userProfileRepository) {
        return userProfileRepository.findById(id);
    }

    public static void updateUserProfile(String oldJobTitle,
                                         String newJobTitle,
                                         UserProfileRepository userProfileRepository) {

        // UserProfileRepository.java : Optional<UserProfile> findByJobTitle(String jobTitle);
        // UserProfile userProfile = userProfileRepository.findByJobTitle(oldJobTitle).orElseThrow(
        //       () -> new RuntimeException("Job title not found")
        // );

        // UserProfileRepository.java : UserProfile findByJobTitle(String jobTitle);
        UserProfile userProfile = userProfileRepository.findByJobTitle(oldJobTitle);
        if (userProfile == null) {
            throw new RuntimeException("Job title not found");
        }
        userProfile.setJobTitle(newJobTitle);

        userProfileRepository.save(userProfile);
    }

    public static void suspendUserProfile(String jobTitle,
                                          UserProfileRepository userProfileRepository) {
        if (!userProfileRepository.existsByJobTitle(jobTitle)) {
            throw new RuntimeException("Job title not found");
        }

        // delete userProfile by that jobTitle
        userProfileRepository.deleteByJobTitle(jobTitle);
    }

    public static List<UserProfile> retrieveUserProfile(String profileType,
                                                        UserProfileRepository userProfileRepository) {
        // Option 1
        // List<UserProfile> userProfileList = userProfileRepository.findAll();
        // for (UserProfile userProfile : userProfileList) {
        //     if (userProfile.getProfileType().equals(profileType)) {
        //         return userProfile;
        //     }
        // }

        // // Option 2
        return userProfileRepository.findAllByProfileType(profileType);
    }
}