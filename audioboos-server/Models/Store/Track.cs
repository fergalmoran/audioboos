namespace AudioBoos.Server.Models.Store {
    public class Track {
        public int Id { get; set; }
        public string TrackName { get; set; }
        public string AudioUrl { get; set; }
        public string PhysicalPath { get; set; }
    }
}
