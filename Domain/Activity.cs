using System;
namespace Domain
{
    public class Activity
    {
        public Activity(Guid id)
        {
            this.Id = id;

        }
        public Guid Id { get; set; }

    }
}