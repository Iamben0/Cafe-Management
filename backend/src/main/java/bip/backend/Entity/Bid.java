package bip.backend.Entity;

import bip.backend.GetRepository;
import bip.backend.Repository.BidRepository;
import bip.backend.Repository.WorkSlotRepository;
import bip.backend.Repository.UserAccountRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
@Entity
@Table(name = "bid")
public class Bid {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "work_slot_id")
    private WorkSlot workSlot;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "staff_id")
    private UserAccount staff;

    @Column(name = "approved", nullable = false)
    private Boolean approved = false;

    // find bid by using workSlotId and set staffId
    public void bidWorkSlot(String workSlotId, String staffId) {
        WorkSlotRepository workSlotRepository = GetRepository.WorkSlot();
        WorkSlot workslot = workSlotRepository.findById(Integer.parseInt(workSlotId)).orElse(null);

        BidRepository bidRepository = GetRepository.Bid();
        assert workslot != null;
        Bid bid = bidRepository.findByWorkSlotId(workslot.getId());

        UserAccountRepository userAccountRepository = GetRepository.UserAccount();
        UserAccount userAccount = userAccountRepository.findById(Integer.parseInt(staffId)).orElse(null);

        if (bid.getStaff() == null) {
            bid.setStaff(userAccount);
            bidRepository.save(bid);
            return;
        }

        if (bid.getStaff().getId() != Integer.parseInt(staffId)) {
            throw new RuntimeException("This work slot has already been taken");
        }

        if (bid.getStaff().getId() == Integer.parseInt(staffId)) {
            throw new RuntimeException("You have already bid for this work slot");
        }
    }

}