package bip.backend;

import bip.backend.Entity.UserAccount;
import bip.backend.Repository.UserAccountRepository;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Tests for LoginController
 * Perform a POST request to the controller, and expect "admin", "owner", "manager", or "staff" as a response.
 * The JSON passed are the username and password.
 * Throw an exception if the returned String does not match the expected String.
 * The given URL in the LoginController class is @PostMapping("/")
 */
@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
class UserAccountLoginTests {

    @Autowired
    MockMvc mockMvc;

    /** Check if the context loads. */
//    @Test
//    void contextLoads()
//    {
//    }

    /** @throws Exception if the status is not 200 or the content is not "admin" */
    @Test
    void TestLoginControllerForAdmin() throws Exception
    {
        MockHttpServletRequestBuilder request = post("/")
                .contentType("application/json")
                .content("{\"username\":\"admin1\",\"password\":\"passwordA1\"}\n");
        mockMvc.perform(request)
                .andDo(print())
                // throw an exception if the status is not 200
                .andExpect(status().isOk())
                // throws an exception if the content is not admin
                .andExpect(content().string("\"admin\""));
    }

    /** @throws Exception if the status is not 200 or the content is not "owner" */
    @Test
    void TestLoginControllerForOwner() throws Exception
    {
        MockHttpServletRequestBuilder request = post("/")
                .contentType("application/json")
                .content("{\"username\":\"owner\",\"password\":\"passwordO1\"}\n");
        mockMvc.perform(request)
                .andDo(print())
                // throw an exception if the status is not 200
                .andExpect(status().isOk())
                // throws an exception if the content is not owner
                .andExpect(content().string("\"owner\""));
    }


    /** @throws Exception if the status is not 200 or the content is not "manager" */
    @Test
    void TestLoginControllerForManager() throws Exception
    {
        MockHttpServletRequestBuilder request = post("/")
                .contentType("application/json")
                .content("{\"username\":\"manager1\",\"password\":\"passwordM1\"}\n");
        mockMvc.perform(request)
                .andDo(print())
                // throw an exception if the status is not 200
                .andExpect(status().isOk())
                // throws an exception if the content is not manager
                .andExpect(content().string("\"manager\""));
    }


    /** @throws Exception if the status is not 200 or the content is not "staff" */
    @Test
    void TestLoginControllerForStaff() throws Exception
    {
        MockHttpServletRequestBuilder request = post("/")
                .contentType("application/json")
                .content("{\"username\":\"staff1\",\"password\":\"password1\"}\n");
        mockMvc.perform(request)
                .andDo(print())
                // throw an exception if the status is not 200
                .andExpect(status().isOk())
                // throws an exception if the content is not staff
                .andExpect(content().string("\"staff\""));
    }
}
