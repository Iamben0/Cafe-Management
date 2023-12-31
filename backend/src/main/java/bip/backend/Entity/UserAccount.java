package bip.backend.Entity;

import bip.backend.Repository.UserAccountRepository;
import bip.backend.Repository.UserProfileRepository;
import bip.backend.Repository.BidRepository;
import bip.backend.GetRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDate;
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
    private Boolean active = true;

    @Column(name = "role")
    private String role;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_profile_id")
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

    // ------------------------ Admin --------------------------
    // create user account
    public void createUserAcct(String username, String name, String password, String email, String jobTitle) {
        UserProfileRepository userProfileRepository = GetRepository.UserProfile();
        UserAccountRepository userAccountRepository = GetRepository.UserAccount();

        if (userAccountRepository.existsByUsername(username)) {
            throw new RuntimeException("Username already exists");
        }
        if (username.isEmpty() || password.isEmpty() || name.isEmpty() || email.isEmpty() || jobTitle.isEmpty()) {
            throw new RuntimeException("Please fill in all fields");
        }
        UserProfile userProfile = userProfileRepository.findByJobTitle(jobTitle).get(0);
        UserAccount userAccount = new UserAccount();

        userAccount.userProfile = userProfile;
        userAccount.setUsername(username);
        userAccount.setName(name);
        userAccount.setPassword(password);
        userAccount.setEmail(email);
        userAccount.setUserProfile(userProfile);
        if (userProfile.getProfileType().equals("admin")   ||
            userProfile.getProfileType().equals("manager") ||
            userProfile.getProfileType().equals("owner")) {
            userAccount.setRole("non-staff");
        } else {
            userAccount.setRole("un-assign");
        }

        userAccountRepository.save(userAccount);
    }

    // view user account
    public String viewUserAcc() {
        List<UserAccount> userAccountList = GetRepository.UserAccount().findAll();
        ObjectMapper mapper = new ObjectMapper();
        JsonNode arrayNode = mapper.valueToTree(userAccountList);
        return arrayNode.toString();
    }

    // update user account
    public void updateUserAccount(String oldUsername,
                                  String newUsername,
                                  String newName,
                                  String newPassword,
                                  String newEmail) {

        UserAccountRepository userAccountRepository = GetRepository.UserAccount();
        UserAccount userAccount = userAccountRepository.findByUsername(oldUsername);

        if (newUsername.equals(oldUsername) &&
                newName.equals(userAccount.getName()) &&
                newPassword.equals(userAccount.getPassword()) &&
                newEmail.equals(userAccount.getEmail())) {
            throw new RuntimeException("No changes detected!");
        }

        userAccount.setUsername(newUsername);
        userAccount.setName(newName);
        userAccount.setPassword(newPassword);
        userAccount.setEmail(newEmail);

        userAccountRepository.save(userAccount);
    }

    public void suspendUserAccount(String username) {
        UserAccountRepository userAccountRepository = GetRepository.UserAccount();
        UserAccount userAccount = userAccountRepository.findByUsername(username);
        userAccount.setActive(false);
        userAccountRepository.save(userAccount);
    }

    public String retrieveUserAccount(String name) {
        List<UserAccount> userAccountList;
        if (name.isBlank()) {
            userAccountList = GetRepository.UserAccount().findAll();
        } else {
            userAccountList = GetRepository.UserAccount().findByNameContainsIgnoreCase(name);
        }

        ObjectMapper mapper = new ObjectMapper();
        JsonNode arrayNode = mapper.valueToTree(userAccountList);
        return arrayNode.toString();
    }

    //------------------------ Manager --------------------------
    // check for the name of the user account who belongs to the role of chef, waiter, cashier,
    // if the bids are approved and work slot is assigned,
    // return those that are not assigned during the date
    public String viewDayAvailableStaff(String date) {
        List<UserAccount> userAccountList = GetRepository.UserAccount().findAll();
        BidRepository bidRepository = GetRepository.Bid();

        ObjectMapper mapper = new ObjectMapper().registerModule(new JavaTimeModule());

        ArrayNode arrayNode = mapper.createArrayNode();

        LocalDate inputDate = LocalDate.parse(date);

        List<UserAccount> staffList = userAccountList.stream()
                .filter(userAccount ->
                        userAccount.getActive() && (
                        userAccount.getRole().equals("chef") ||
                        userAccount.getRole().equals("waiter") ||
                        userAccount.getRole().equals("cashier"))
                )
                .toList();

        for (UserAccount userAccount : staffList) {
            boolean isAvailable = bidRepository.findAllByStaffId(userAccount.getId()).stream()
                    .filter(bid -> bid.getStatus().equals("approved"))
                    .map(Bid::getWorkSlot)
                    .noneMatch(workSlot -> workSlot.getDate().isEqual(inputDate));

            if (isAvailable) {
                ObjectNode on = mapper.createObjectNode();
                on.put("date", date);
                on.put("username", userAccount.getUsername());
                on.put("name", userAccount.getName());
                on.put("role", userAccount.getRole());
                arrayNode.add(on);
            }
        }

        return arrayNode.toString();
    }

    // check for the name of the user account who belongs to the role of chef, waiter, cashier,
    // if the bids are approved and work slot is assigned on that date
    // return those that are not assigned during the date + another 6 days
    public String viewWeekAvailableStaff(String date) {
        List<UserAccount> userAccountList = GetRepository.UserAccount().findAll();
        BidRepository bidRepository = GetRepository.Bid();
        ObjectMapper mapper = new ObjectMapper().registerModule(new JavaTimeModule());

        ArrayNode arrayNode = mapper.createArrayNode();

        LocalDate inputDate = LocalDate.parse(date);

        for (int day = 0; day < 7; day++) {
            LocalDate checkDate = inputDate.plusDays(day);

            List<UserAccount> staffList = userAccountList.stream()
                    .filter(userAccount -> userAccount.getActive() && (
                            userAccount.getRole().equals("chef") ||
                            userAccount.getRole().equals("waiter") ||
                            userAccount.getRole().equals("cashier"))
                    )
                    .toList();

            for (UserAccount userAccount : staffList) {
                String status = "available";

                List<Bid> bidList = bidRepository.findAllByStaffId(userAccount.getId());

                for (Bid bid : bidList) {
                    if (bid.getStatus().equals("approved")) {
                        WorkSlot workSlot = bid.getWorkSlot();
                        LocalDate workSlotDate = workSlot.getDate();

                        if (workSlotDate.isEqual(checkDate) ||
                                (workSlotDate.isAfter(checkDate) && workSlotDate.isBefore(checkDate.plusDays(1)))) {
                            status = "not available";
                            break; // No need to continue checking other bids
                        }
                    }
                }

                // Show for all the days
                if (status.equals("available")) {
                    ObjectNode on = mapper.createObjectNode();
                    on.put("date", checkDate.toString());
                    on.put("username", userAccount.getUsername());
                    on.put("name", userAccount.getName());
                    on.put("role", userAccount.getRole());
                    arrayNode.add(on);
                }
            }
        }

        return arrayNode.toString();
    }

    // ------------------------ Staff --------------------------
    public void selectRole(String username, String role) {
        UserAccountRepository userAccountRepository = GetRepository.UserAccount();
        UserAccount userAccount = userAccountRepository.findByUsername(username);

        if (userAccount.getRole().equals("chef") || userAccount.getRole().equals("waiter") || userAccount.getRole().equals("cashier")) {
            throw new RuntimeException("Role has been set, cannot be changed!");
        }

        userAccount.setRole(role);

        userAccountRepository.save(userAccount);
    }
}

