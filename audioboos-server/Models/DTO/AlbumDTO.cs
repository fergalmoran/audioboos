namespace AudioBoos.Server.Models.DTO {
    public class AlbumDTO {
        public int Id { get; set; }
        public string ArtistName { get; set; }
        public string AlbumName { get; set; }

        public Track[] Tracks { get; set; }
    }

    public class Track {
        public int Id { get; set; }
        public string TrackName { get; set; }
        public string AudioUrl { get; set; }
    }
}
