import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import {
  BlurView,
  BlurViewDirection,
  type BlurViewProps,
} from "expo-ios-visual-blur";

interface AppCard {
  id: string;
  title: string;
  subtitle: string;
  rating: number;
  category: string;
  image: string;
  featured?: boolean;
}

const featuredApps: AppCard[] = [
  {
    id: "1",
    title: "Photomator",
    subtitle: "Photo Editor",
    rating: 4.8,
    category: "Photography",
    image:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=300&fit=crop",
    featured: true,
  },
  {
    id: "2",
    title: "Procreate",
    subtitle: "Digital Art Studio",
    rating: 4.9,
    category: "Graphics & Design",
    image:
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=300&h=300&fit=crop",
  },
  {
    id: "3",
    title: "Bear",
    subtitle: "Note Taking App",
    rating: 4.7,
    category: "Productivity",
    image:
      "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=300&h=300&fit=crop",
  },
  {
    id: "4",
    title: "Things 3",
    subtitle: "Task Manager",
    rating: 4.6,
    category: "Productivity",
    image:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=300&fit=crop",
  },
  {
    id: "5",
    title: "Darkroom",
    subtitle: "Photo & Video Editor",
    rating: 4.5,
    category: "Photo & Video",
    image:
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=300&h=300&fit=crop",
  },
  {
    id: "6",
    title: "Notion",
    subtitle: "All-in-one workspace",
    rating: 4.4,
    category: "Productivity",
    image:
      "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=300&h=300&fit=crop",
  },
];

const categories = [
  "All",
  "Featured",
  "Photography",
  "Productivity",
  "Graphics & Design",
  "Games",
];

export default function AppStoreUI() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const StickyHeader = () => (
    <View style={styles.stickyHeader}>
      <BlurView
        style={styles.headerBlur}
        direction={BlurViewDirection.BlurredTopClearBottom}
        maxBlurRadius={105}
        startOffset={0.1}
      />
      <View style={styles.headerGradient}>
        <View style={styles.headerSafeArea}>
          <View style={styles.headerContent}>
            <View style={styles.headerTop}>
              <Text style={styles.headerTitle}>Expo Store</Text>
              <TouchableOpacity style={styles.profileButton}>
                <Image
                  source={{
                    uri: "https://i.pinimg.com/736x/1e/76/a4/1e76a41d2b822d8b37e91d59d1ace813.jpg",
                  }}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 1000,
                  }}
                />
                {/* <Ionicons name="person-circle-outline" size={32} color="#fff" /> */}
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.searchContainer}>
              <Ionicons name="search" size={20} color="#999" />
              <Text style={styles.searchPlaceholder}>
                Games, Apps, Stories and more
              </Text>
              <Ionicons name="mic" size={20} color="#999" />
            </TouchableOpacity>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.categoriesScroll}
              contentContainerStyle={styles.categoriesContainer}
            >
              {categories.map((category) => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.categoryButton,
                    selectedCategory === category &&
                      styles.selectedCategoryButton,
                  ]}
                  onPress={() => setSelectedCategory(category)}
                >
                  <Text
                    style={[
                      styles.categoryButtonText,
                      selectedCategory === category &&
                        styles.selectedCategoryText,
                    ]}
                  >
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </View>
    </View>
  );

  const AppCard: React.FC<{ app: AppCard; featured?: boolean }> = ({
    app,
    featured = false,
  }) => (
    <TouchableOpacity style={[styles.appCard, featured && styles.featuredCard]}>
      <View style={styles.appCardContent}>
        <Image source={{ uri: app.image }} style={styles.appIcon} />
        <View style={styles.appInfo}>
          <Text style={styles.appTitle}>{app.title}</Text>
          <Text style={styles.appSubtitle}>{app.subtitle}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={12} color="#FFD700" />
            <Text style={styles.ratingText}>{app.rating}</Text>
            <Text style={styles.categoryText}>{app.category}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.getButton}>
          <Text style={styles.getButtonText}>GET</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const FeaturedBanner = () => (
    <View style={styles.featuredBanner}>
      <LinearGradient
        colors={["#667eea", "#764ba2"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.featuredGradient}
      >
        <View style={styles.featuredContent}>
          <Text style={styles.featuredLabel}>FEATURED APP</Text>
          <Text style={styles.featuredTitle}>Photomator</Text>
          <Text style={styles.featuredSubtitle}>
            Professional photo editing made simple
          </Text>
          <TouchableOpacity style={styles.featuredButton}>
            <Text style={styles.featuredButtonText}>Try Now</Text>
          </TouchableOpacity>
        </View>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=200&fit=crop",
          }}
          style={styles.featuredImage}
        />
      </LinearGradient>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      <StickyHeader />

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <FeaturedBanner />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recommended for You</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        {featuredApps.map((app) => (
          <AppCard key={app.id} app={app} />
        ))}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Trending Apps</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        {featuredApps.slice(0, 4).map((app) => (
          <AppCard key={`trending-${app.id}`} app={app} />
        ))}

        <View style={styles.bottomPadding} />
      </ScrollView>

      <View style={styles.bottomBlurContainer} pointerEvents="none">
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.3)", "rgba(0,0,0,0.8)", "#000"]}
          style={styles.bottomFadeGradient}
        />
        <BlurView
          style={styles.bottomBlur}
          maxBlurRadius={20}
          direction={BlurViewDirection.BlurredBottomClearTop}
          startOffset={0.1}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  stickyHeader: {
    position: "absolute",
    top: 80,
    left: 0,
    right: 0,
    zIndex: 1000,
    height: 180,
  },
  headerBlur: {
    position: "absolute",
    top: -300,
    left: 0,
    right: 0,
    height: 500,
  },
  headerGradient: {
    flex: 1,
    paddingBottom: 49,
  },
  headerSafeArea: {
    flex: 1,
    paddingTop: 20,
  },
  headerContent: {
    flex: 1,
    paddingHorizontal: 20,
    gap: 16,
    justifyContent: "flex-end",
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: "700",
    color: "#fff",
  },
  profileButton: {
    padding: 4,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  searchPlaceholder: {
    color: "#999",
    fontSize: 16,
    flex: 1,
  },
  categoriesScroll: {
    maxHeight: 40,
  },
  categoriesContainer: {
    gap: 12,
    paddingRight: 20,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
  },
  selectedCategoryButton: {
    backgroundColor: "rgba(255,255,255,0.9)",
    borderColor: "rgba(255,255,255,0.9)",
  },
  categoryButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  selectedCategoryText: {
    color: "#000",
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 250,
  },
  featuredBanner: {
    marginBottom: 32,
    borderRadius: 16,
    overflow: "hidden",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  featuredGradient: {
    flexDirection: "row",
    padding: 24,
    alignItems: "center",
  },
  featuredContent: {
    flex: 1,
    gap: 8,
  },
  featuredLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "rgba(255,255,255,0.8)",
    letterSpacing: 1,
  },
  featuredTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
  },
  featuredSubtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.9)",
    marginBottom: 12,
  },
  featuredButton: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  featuredButtonText: {
    color: "#764ba2",
    fontWeight: "600",
    fontSize: 14,
  },
  featuredImage: {
    width: 80,
    height: 80,
    borderRadius: 16,
    marginLeft: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
  },
  seeAllText: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "500",
  },
  appCard: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  featuredCard: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderColor: "rgba(255,255,255,0.15)",
  },
  appCardContent: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
  },
  appIcon: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 16,
  },
  appInfo: {
    flex: 1,
    gap: 4,
  },
  appTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  appSubtitle: {
    fontSize: 14,
    color: "#999",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
  },
  ratingText: {
    fontSize: 12,
    color: "#FFD700",
    fontWeight: "500",
  },
  categoryText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 8,
  },
  getButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 16,
  },
  getButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  bottomPadding: {
    height: 120,
  },

  bottomBlurContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    zIndex: 1000,
  },
  bottomFadeGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  bottomBlur: {
    position: "absolute",
    bottom: -200,
    left: 0,
    right: 0,
    height: 300,
  },
});

const Test = () => {
  return (
    <BlurView
      direction={BlurViewDirection.BlurredBottomClearTop}
      maxBlurRadius={21}
      startOffset={0.1}
    >
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1754638069174-7aa06c176b61?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        }}
        style={{
          width: 200,
          height: 200,
          borderRadius: 10,
        }}
      />
    </BlurView>
  );
};
