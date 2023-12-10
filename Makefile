local:
	git add .
	git commit -m "local build"
	git push origin main  --force
prod:
	rm -rf build
	git pull origin main
	npm install
	npm run build
	screen npm run preview
awslogin:
	ssh -i ~/.aws/firstshipper-ssh.pem ec2-user@ec2-54-183-231-184.us-west-1.compute.amazonaws.com