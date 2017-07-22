IMAGE_NAME = aloisatastronomer/angelhack-api

.PHONY: build push run

build:
	docker build -t $(IMAGE_NAME) .

push:
	docker push $(IMAGE_NAME)

run:
	docker run -it --env-file=./.env $(IMAGE_NAME)