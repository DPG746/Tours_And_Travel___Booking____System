package com.travel.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.travel.entity.Contact;
import com.travel.service.ContactService;

@WebMvcTest(ContactController.class)
class ContactControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private ContactService contactService;

    @Test
    void saveContact_shouldReturnCreatedContact() throws Exception {
        Contact contact = new Contact();
        contact.setName("Alice");
        contact.setEmail("alice@example.com");

        Contact savedContact = new Contact();
        savedContact.setId(1L);
        savedContact.setName("Alice");
        savedContact.setEmail("alice@example.com");

        when(contactService.saveContact(any(Contact.class))).thenReturn(savedContact);

        mockMvc.perform(post("/api/contact")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(contact)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("Alice"))
                .andExpect(jsonPath("$.email").value("alice@example.com"));
    }

    @Test
    void getAllContacts_shouldReturnContactList() throws Exception {
        Contact contact = new Contact();
        contact.setId(1L);
        contact.setName("Bob");

        when(contactService.getAllContacts()).thenReturn(List.of(contact));

        mockMvc.perform(get("/api/contact"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1))
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].name").value("Bob"));
    }

    @Test
    void deleteContact_existingId_shouldReturnSuccessMessage() throws Exception {
        when(contactService.deleteContactById(1L)).thenReturn(true);

        mockMvc.perform(delete("/api/contact/1"))
                .andExpect(status().isOk())
                .andExpect(content().string("Contact deleted successfully with ID: 1"));
    }

    @Test
    void deleteContact_nonExistingId_shouldReturnNotFoundMessage() throws Exception {
        when(contactService.deleteContactById(99L)).thenReturn(false);

        mockMvc.perform(delete("/api/contact/99"))
                .andExpect(status().isNotFound())
                .andExpect(content().string("Contact not found with ID: 99"));
    }

    @Test
    void deleteAllContacts_shouldReturnSuccessMessage() throws Exception {
        doNothing().when(contactService).deleteAllContacts();

        mockMvc.perform(delete("/api/contact/all"))
                .andExpect(status().isOk())
                .andExpect(content().string("All contacts deleted successfully"));
    }
}
