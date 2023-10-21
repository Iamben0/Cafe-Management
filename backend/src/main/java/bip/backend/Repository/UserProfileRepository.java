package bip.backend.Repository;

import bip.backend.Entity.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserProfileRepository extends JpaRepository<UserProfile, Integer> {
    UserProfile findById(int id);
    List<UserProfile>findAllByProfileType(String profileType);
    Boolean existsByProfileType(String jobTitle);
    UserProfile findByJobTitle(String oldJobTitle);
    Boolean existsByJobTitle(String jobTitle);
    void deleteByJobTitle(String jobTitle);
}
