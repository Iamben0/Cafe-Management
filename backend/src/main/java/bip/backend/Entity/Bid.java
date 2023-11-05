package bip.backend.Entity;

import bip.backend.GetRepository;
import bip.backend.Repository.BidRepository;
import bip.backend.Repository.WorkSlotRepository;
import bip.backend.Repository.UserAccountRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
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

    @Column(name = "status", nullable = false)
    private String status = "pending";

    // ------------------------ Staff --------------------------
    public void bidWorkSlot(int workSlotId, int staffId) {
        BidRepository bidRepository = GetRepository.Bid();
        List<Bid> bidList = bidRepository.findAllByStaffId(staffId);

        WorkSlotRepository workSlotRepository = GetRepository.WorkSlot();
        WorkSlot workSlot = workSlotRepository.findById(workSlotId).orElse(null);

        for (Bid bid : bidList) {
            assert workSlot != null;
            if (bid.getWorkSlot().getDate().isEqual(workSlot.getDate()) &&
                    bid.getWorkSlot().getShift().equals(workSlot.getShift())) {
                throw new RuntimeException("You have already bid for this work slot");
            }
        }

        Bid bid = new Bid();

        if (bidRepository.existsByWorkSlotId(workSlotId) && !bid.getStatus().equals("pending")) {
            throw new RuntimeException("This work slot has already been taken");
        }

        UserAccountRepository userAccountRepository = GetRepository.UserAccount();
        UserAccount userAccount = userAccountRepository.findById(staffId).orElse(null);

        bid.setWorkSlot(workSlot);
        bid.setStatus("pending");
        bid.setStaff(userAccount);

        bidRepository.save(bid);
    }

    public String viewBidResult(int staffId) {
        BidRepository bidRepository = GetRepository.Bid();
        List<Bid> bidList = bidRepository.findAllByStaffId(staffId);

        ObjectMapper mapper = new ObjectMapper().registerModule(new JavaTimeModule());

        ArrayNode arrayNode = mapper.createArrayNode();
        for (Bid bid : bidList) {
            ObjectNode on = mapper.createObjectNode();
            on.put("role", bid.getWorkSlot().getRole());
            on.put("date", bid.getWorkSlot().getDate().toString());
            on.put("shift", bid.getWorkSlot().getShift());
            on.put("status", bid.getStatus());
            arrayNode.add(on);
        }
        return arrayNode.toString();
    }

    public String viewApprovedBidWorkSlot(int staffId) {
        BidRepository bidRepository = GetRepository.Bid();
        List<Bid> bidList = bidRepository.findAllByStaffId(staffId);

        ObjectMapper mapper = new ObjectMapper().registerModule(new JavaTimeModule());
        ArrayNode arrayNode = mapper.createArrayNode();

        for (Bid bid : bidList) {
            if (Objects.equals(bid.getStatus(), "approved") &&
                    bid.getWorkSlot().getDate().isAfter(LocalDate.now())) {
                ObjectNode on = mapper.createObjectNode();
                on.put("bidId", bid.getId());
                on.put("role", bid.getWorkSlot().getRole());
                on.put("date", bid.getWorkSlot().getDate().toString());
                on.put("shift", bid.getWorkSlot().getShift());
                on.put("status", bid.getStatus());
                arrayNode.add(on);
            }
        }
        return arrayNode.toString();
    }

    public void cancelApprovedBidWorkSlot(int bidId) {
        BidRepository bidRepository = GetRepository.Bid();
        Bid bid = bidRepository.findById(bidId).orElse(null);

        assert bid != null;
        bid.getWorkSlot().setAssigned(false);
//        bid.setStatus("cancelled");
//        bidRepository.save(bid);
        bidRepository.delete(bid);
    }

    public String retrieveApprovedBidWorkSlot(int staffId, String shift) throws JsonProcessingException {
        String list = viewApprovedBidWorkSlot(staffId);
        ArrayNode arrayNode = new ObjectMapper().createArrayNode();
        arrayNode.addAll((ArrayNode) new ObjectMapper().readTree(list));

        if (shift.isBlank()) {
            return arrayNode.toString();
        } else {
            ArrayNode filteredArrayNode = new ObjectMapper().createArrayNode();
            for (JsonNode jsonNode : arrayNode) {
                if (jsonNode.get("shift").asText().toLowerCase().contains(shift.toLowerCase())) {
                    filteredArrayNode.add(jsonNode);
                }
            }
            return filteredArrayNode.toString();
        }
    }

    //------------------------ Manager --------------------------
    public String viewStaffBid() {
        BidRepository bidRepository = GetRepository.Bid();
        List<Bid> bidList = bidRepository.findAll();

        ObjectMapper mapper = new ObjectMapper().registerModule(new JavaTimeModule());

        ArrayNode arrayNode = mapper.createArrayNode();
        for (Bid bid : bidList) {
            if (Objects.equals(bid.getStatus(), "pending")) {
                ObjectNode on = mapper.createObjectNode();
                on.put("name", bid.getStaff().getName());
                on.put("role", bid.getWorkSlot().getRole());
                on.put("date", bid.getWorkSlot().getDate().toString());
                on.put("shift", bid.getWorkSlot().getShift());
                on.put("bidId", bid.getId());
                arrayNode.add(on);
            }
        }
        return arrayNode.toString();
    }

    public void approveBid(int bidId, String status) {
        BidRepository bidRepository = GetRepository.Bid();
        Bid bid = bidRepository.findById(bidId).orElse(null);

        assert bid != null;
        bid.setStatus(status);
        bid.getWorkSlot().setAssigned(true);
        bidRepository.save(bid);
    }

    public void rejectBid(int bidId, String status) {
        BidRepository bidRepository = GetRepository.Bid();
        Bid bid = bidRepository.findById(bidId).orElse(null);

        assert bid != null;
        bid.setStatus(status);
        bidRepository.save(bid);
    }

    public String retrievesStaffBid(String name) throws JsonProcessingException {
        String list = viewStaffBid();
        ArrayNode arrayNode = new ObjectMapper().createArrayNode();
        arrayNode.addAll((ArrayNode) new ObjectMapper().readTree(list));

        if (name.isBlank()) {
            return arrayNode.toString();
        } else {
            ArrayNode filteredArrayNode = new ObjectMapper().createArrayNode();
            for (JsonNode jsonNode : arrayNode) {
                if (jsonNode.get("name").asText().toLowerCase().contains(name.toLowerCase())) {
                    filteredArrayNode.add(jsonNode);
                }
            }
            return filteredArrayNode.toString();
        }
    }
}
