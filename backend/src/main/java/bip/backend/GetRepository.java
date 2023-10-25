package bip.backend;

import bip.backend.Repository.UserAccountRepository;
import bip.backend.Repository.UserProfileRepository;
import org.springframework.context.annotation.Bean;

/* Rename SpringConfiguration to Repository */
public class GetRepository {
    @Bean
    public static ApplicationContextProvider contextProvider() {
        return new ApplicationContextProvider();
    }

    @Bean
    public static UserAccountRepository UserAccount() {
        return (UserAccountRepository) new ApplicationContextProvider().getApplicationContext().getBean("userAccountRepository");
    }

    @Bean
    public static UserProfileRepository UserProfile() {
        return (UserProfileRepository) new ApplicationContextProvider().getApplicationContext().getBean("userProfileRepository");
    }
}
