provider "aws" {
  region = "us-east-1" # You can change this to your preferred region
}

# 1. Create a Security Group (Firewall)
resource "aws_security_group" "linkedin_sg" {
  name        = "linkedin-clone-sg"
  description = "Allow web traffic"

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # Open to the world
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # For SSH access
  }

  ingress {
    from_port   = 5000
    to_port     = 5000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# 2. Define the EC2 Instance
resource "aws_instance" "app_server" {
  ami                    = "ami-0c7217cdde317cfec" # Standard Ubuntu 22.04 AMI (Check your region's ID!)
  instance_type          = "t2.micro"              # Free Tier eligible
  key_name               = "linkedin-clone"
  vpc_security_group_ids = [aws_security_group.linkedin_sg.id]

  tags = {
    Name = "LinkedInClone-Server"
  }

  # This script runs as soon as the server starts
  user_data = <<-EOF
              #!/bin/bash
              sudo apt-get update
              sudo apt-get install -y docker.io
              sudo systemctl start docker
              sudo systemctl enable docker
              EOF
}

resource "aws_eip" "app_eip" {
  instance = aws_instance.app_server.id
  domain   = "vpc"
}

output "public_ip" {
  value = aws_eip.app_eip.public_ip
}
