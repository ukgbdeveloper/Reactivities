using System;
namespace Domain
{
    public class Activity
    {
        public Activity(Guid id)
        {
            this.Id = id;

        }

        public int Numb { get; set; }
        public Guid Id { get; set; }

    }
}