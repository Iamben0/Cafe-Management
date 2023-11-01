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

    // let staff view if their bid is approved or not approved
    public String viewBidResult(String staffId) {
        BidRepository bidRepository = GetRepository.Bid();
        List<Bid> bidList = bidRepository.findAllByStaffId(Integer.parseInt(staffId));

        ObjectMapper mapper = new ObjectMapper().registerModule(new JavaTimeModule());

        ArrayNode arrayNode = mapper.createArrayNode();
        for (Bid bid : bidList) {
            ObjectNode on = mapper.createObjectNode();
            on.put("workSlotId", bid.getWorkSlot().getId());
            on.put("shift", bid.getWorkSlot().getShift());
            on.put("role", bid.getWorkSlot().getRole());
            on.put("date", bid.getWorkSlot().getDate().toString());
            on.put("approved", bid.getApproved());
            arrayNode.add(on);
        }
        return arrayNode.toString();
    }
}