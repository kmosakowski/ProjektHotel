package tin.mp4.projekt.model;

public class Filter {
    private Long userId;
    private Long cityId;
    private Long hotelId;
    private String chosenDate;

    public Filter(){

    }

    public Filter(Long userId, Long cityId, Long hotelId, String chosenDate) {
        this.userId = userId;
        this.cityId = cityId;
        this.hotelId = hotelId;
        this.chosenDate = chosenDate;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getCityId() {
        return cityId;
    }

    public void setCityId(Long cityId) {
        this.cityId = cityId;
    }

    public Long getHotelId() {
        return hotelId;
    }

    public void setHotelId(Long hotelId) {
        this.hotelId = hotelId;
    }

    public String getchosenDate() {
        return chosenDate;
    }

    public void setchosenDate(String chosenDate) {
        this.chosenDate = chosenDate;
    }

    @Override
    public String toString() {
        return "Filter{" +
                "userId=" + userId +
                "cityId=" + cityId +
                ", hotelId=" + hotelId +
                ", chosenDate=" + chosenDate +
                '}';
    }
}
