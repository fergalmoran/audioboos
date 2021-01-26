using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using AudioBoos.Server.Persistence.Annotations;
using AudioBoos.Server.Persistence.Interfaces;

namespace AudioBoos.Server.Models.Store {
    public class Artist : IBaseEntity {
        public int Id { get; set; }

        public string ArtistName { get; set; }

        public string Description { get; set; }
        public string SmallImage { get; set; }
        public string LargeImage { get; set; }

        public List<Album> Albums { get; set; }
    }
}
