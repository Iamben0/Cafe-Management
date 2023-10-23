package bip.backend.Repository;

import bip.backend.Entity.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserProfileRepository extends JpaRepository<UserProfile, Integer> {
    Boolean existsByJobTitle(String jobTitle);

    UserProfile findByJobTitle(String jobTitle);

    UserProfile findByProfileType(String profileType);
}
