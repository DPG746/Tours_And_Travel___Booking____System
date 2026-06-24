package com.travel.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.travel.entity.Contact;
import com.travel.repository.ContactRepository;

@ExtendWith(MockitoExtension.class)
class ContactServiceTest {

    @Mock
    private ContactRepository contactRepository;

    @InjectMocks
    private ContactService contactService;

    @Test
    void saveContact_shouldSaveAndReturnContact() {
        Contact contact = new Contact();
        contact.setName("Alice");
        contact.setEmail("alice@example.com");

        Contact savedContact = new Contact();
        savedContact.setId(1L);
        savedContact.setName("Alice");
        savedContact.setEmail("alice@example.com");

        when(contactRepository.save(contact)).thenReturn(savedContact);

        Contact result = contactService.saveContact(contact);

        assertThat(result).isEqualTo(savedContact);
    }

    @Test
    void getAllContacts_shouldReturnList() {
        Contact contact = new Contact();
        contact.setId(1L);
        contact.setName("Bob");

        when(contactRepository.findAll()).thenReturn(List.of(contact));

        List<Contact> result = contactService.getAllContacts();

        assertThat(result).hasSize(1);
        assertThat(result.get(0).getName()).isEqualTo("Bob");
    }

    @Test
    void deleteContactById_existingId_shouldDeleteAndReturnTrue() {
        when(contactRepository.existsById(5L)).thenReturn(true);

        boolean deleted = contactService.deleteContactById(5L);

        assertThat(deleted).isTrue();
        verify(contactRepository).deleteById(5L);
    }

    @Test
    void deleteContactById_nonExistingId_shouldReturnFalse() {
        when(contactRepository.existsById(99L)).thenReturn(false);

        boolean deleted = contactService.deleteContactById(99L);

        assertThat(deleted).isFalse();
    }

    @Test
    void deleteAllContacts_shouldCallRepositoryDeleteAll() {
        contactService.deleteAllContacts();

        verify(contactRepository).deleteAll();
    }
}
